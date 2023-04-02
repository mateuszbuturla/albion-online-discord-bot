"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CRONContent = void 0;
const date_fns_1 = require("date-fns");
const types_1 = require("../../types");
const entities_1 = require("../../entities");
const sendDMReminder = (event) => __awaiter(void 0, void 0, void 0, function* () {
    yield event.participants.forEach((participant) => __awaiter(void 0, void 0, void 0, function* () {
        if (participant.reminderSent) {
            return;
        }
        const user = yield globalThis.client.users.fetch(participant.userId);
        if (!user) {
            return;
        }
        user.send({
            content: 'Przymonienie! Za mnie niż 30 minut rozpoczyna się wydarzenie, na które jesteś zapisany(a)',
        });
        participant.reminderSent = true;
        yield participant.save(); // @TODO
    }));
});
const CRONContent = () => __awaiter(void 0, void 0, void 0, function* () {
    const pendingEvents = yield (0, entities_1.getAllPendingContents)();
    pendingEvents.forEach((event) => __awaiter(void 0, void 0, void 0, function* () {
        const splitDate = event.date.split('-');
        const splitTime = event.time.split(':');
        const contentDate = new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0]), Number(splitTime[0]), Number(splitTime[1]), 0);
        const now = (0, date_fns_1.addHours)(new Date(), 2);
        if ((0, date_fns_1.differenceInMinutes)(contentDate, now) < 30) {
            yield sendDMReminder(event);
        }
        if ((0, date_fns_1.differenceInMinutes)(contentDate, now) < 0) {
            event.status = types_1.EventStaus.inProgrss;
            yield event.save(); // @TODO
        }
    }));
    const inProgessEvents = yield (0, entities_1.getAllInProgressContents)();
    console.log(inProgessEvents);
    inProgessEvents.forEach((event) => __awaiter(void 0, void 0, void 0, function* () {
        const splitDate = event.date.split('-');
        const splitTime = event.time.split(':');
        const contentDate = new Date(Number(splitDate[2]), Number(splitDate[1]) - 1, Number(splitDate[0]), Number(splitTime[0]), Number(splitTime[1]), 0);
        const now = (0, date_fns_1.addHours)(new Date(), 2);
        if ((0, date_fns_1.differenceInMinutes)(contentDate, now) < -30) {
            event.status = types_1.EventStaus.done;
            yield event.save(); // @TODO
            const channel = yield globalThis.client.channels.fetch(event.channelId);
            if (!channel) {
                return;
            }
            const dd = (yield channel.messages);
            const msg = yield dd.fetch(event.messageId);
            if (!msg) {
                return;
            }
            yield msg.delete(); // @TODO
        }
    }));
});
exports.CRONContent = CRONContent;

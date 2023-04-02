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
exports.setContentChannelAndMessageId = exports.getAllInProgressContents = exports.getAllPendingContents = exports.getEventById = exports.addParticipantToEvent = exports.finishEventCreation = exports.saveTemplateToEvent = exports.getEventByUserIdWithStatusCreating = exports.createEvent = void 0;
const types_1 = require("../../../types");
const event_entity_1 = require("./event.entity");
const createEvent = (guildId, authorId, authorName) => __awaiter(void 0, void 0, void 0, function* () {
    const newEvent = new event_entity_1.EventEntity();
    newEvent.guildId = guildId;
    newEvent.authorId = authorId;
    newEvent.author = authorName;
    newEvent.status = types_1.EventStaus.creating;
    return yield newEvent.save();
});
exports.createEvent = createEvent;
const getEventByUserIdWithStatusCreating = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_entity_1.EventEntity.findOne({
        where: { authorId, status: types_1.EventStaus.creating },
        relations: ['template', 'template.classes', 'template.roles'],
    });
    return result;
});
exports.getEventByUserIdWithStatusCreating = getEventByUserIdWithStatusCreating;
const saveTemplateToEvent = (event, template) => __awaiter(void 0, void 0, void 0, function* () {
    event.template = template;
    yield event.save();
    return event;
});
exports.saveTemplateToEvent = saveTemplateToEvent;
const finishEventCreation = (event, name, description, date, time) => __awaiter(void 0, void 0, void 0, function* () {
    event.name = name;
    event.description = description;
    event.status = types_1.EventStaus.pending;
    event.date = date;
    event.time = time;
    event.participants = [];
    yield event.save();
    return event;
});
exports.finishEventCreation = finishEventCreation;
const addParticipantToEvent = (event, participant) => __awaiter(void 0, void 0, void 0, function* () {
    event.participants = [...event.participants, participant];
    yield event.save();
    return event;
});
exports.addParticipantToEvent = addParticipantToEvent;
const getEventById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_entity_1.EventEntity.findOne({
        where: { id },
        relations: [
            'template',
            'template.classes',
            'template.roles',
            'participants',
            'participants.selectedClass',
        ],
    });
    return result;
});
exports.getEventById = getEventById;
const getAllPendingContents = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_entity_1.EventEntity.find({
        where: { status: types_1.EventStaus.pending },
        relations: ['participants'],
    });
    return result;
});
exports.getAllPendingContents = getAllPendingContents;
const getAllInProgressContents = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield event_entity_1.EventEntity.find({
        where: { status: types_1.EventStaus.inProgrss },
        relations: ['participants'],
    });
    return result;
});
exports.getAllInProgressContents = getAllInProgressContents;
const setContentChannelAndMessageId = (event, channelId, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    event.messageId = messageId;
    event.channelId = channelId;
    return yield event.save();
});
exports.setContentChannelAndMessageId = setContentChannelAndMessageId;

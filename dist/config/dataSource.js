"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mariadb',
    host: 'localhost',
    port: 3306,
    username: 'admin',
    password: 'password',
    database: 'albion_bot',
    synchronize: true,
    entities: [
        entities_1.ServerConfigEntity,
        entities_1.ContentTemplateEntity,
        entities_1.ContentRoleEntity,
        entities_1.ContentClassEntity,
        entities_1.EventEntity,
        entities_1.ContentParticipantEntity,
    ],
});

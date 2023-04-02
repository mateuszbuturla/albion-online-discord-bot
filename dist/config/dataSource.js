"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mariadb',
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
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

import chai from 'chai';
import chaiHttp from 'chai-http';
import {app} from "../server";
import {dbTask} from "../models/task.model";
import {createTask, getTask} from "../controllers/task/task.controller";

import { ITaskModel } from '../models/task.model';

const faker = require('faker');
const sinon = require('sinon');


chai.use(chaiHttp);
chai.should();


let task: any = {
    title: 'Math',
    description: '1+1',
    solution: '',
    finish: false
};

let updateTask: any = {
    title: 'Physic',
    description: 'Drehmoment',
    solution: '',
    finish: false
};

let taskID: string;

describe("Test CRUD of task API", () => {


    // Test create a new task
    describe("POST /api/task/createTask", () => {
        it('should create new Task', (done) => {

            const stubValue = {
                title: faker.name.findName(),
                description: faker.lorem.text(),
                solution: faker.lorem.text(),
                finish: false
            };

            const stub = sinon.stub(dbTask, 'create').returns(stubValue);

            chai.request(app)
                .post('/api/task/createTask')
                .set('Content-Type', 'application/json')
                .send(JSON.stringify(updateTask))
                .then((res) => {
                    stub.calledOnce.should.be.true;
                    console.log(res);

                    done();
                }).catch((err) => console.log(err));
        });
    });


});

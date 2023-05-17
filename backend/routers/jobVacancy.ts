import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import JobVacancy from "../models/JobVacancy";

const jobVacancyRouter = express.Router();

jobVacancyRouter.post('/', async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const jobVacancy = await JobVacancy.create({
            user: user._id,
            datetime: req.body.datetime,
            nameOrganisation: req.body.nameOrganisation,
            vacancyDesc: req.body.vacancyDesc,
            vacancyName: req.body.vacancyName,
            requirements: req.body.requirements,
            salaries: req.body.salaries,
        });
        return res.send(jobVacancy);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

jobVacancyRouter.get('/', async (req, res, next) => {
    try {
        const jobVacancyRes = await JobVacancy.find();
        return res.send(jobVacancyRes);
    } catch (e) {
        return next(e);
    }
});

jobVacancyRouter.get('/:id', async (req, res) => {
    try {
        const result = await JobVacancy.findById(req.params.id);
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

jobVacancyRouter.delete('/jobVacancyDelete/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const jobVacancy = await JobVacancy.findById(req.params.id);

        if (jobVacancy) {
            if (jobVacancy.user.toString() === user._id.toString()) {
                await JobVacancy.deleteOne({_id: req.params.id});
                return res.send({message: "OK"});
            }
        }
    } catch (e) {
        return next(e);
    }
});

export default jobVacancyRouter;



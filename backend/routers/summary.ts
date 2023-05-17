import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Summary from "../models/Summary";
import Education from "../models/Education";

const summaryRouter = express.Router();

summaryRouter.post('/', async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const summary = await Summary.create({
            user: user._id,
            datetime: req.body.datetime,
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
        });
        return res.send(summary);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

summaryRouter.get('/', async (req, res, next) => {
    try {
        const summaryRes = await Summary.find();
        return res.send(summaryRes);
    } catch (e) {
        return next(e);
    }
});

summaryRouter.get('/:id', async (req, res) => {
    try {
        const result = await Summary.findById(req.params.id);
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

summaryRouter.delete('/summaryDelete/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const summary = await Summary.findById(req.params.id);

        if (summary) {
            if (summary.user.toString() === user._id.toString()) {
                await Summary.deleteOne({_id: req.params.id});
                const education = await Education.findOne({summary: summary._id});
                if (education) {
                    await Education.deleteMany({summary: summary._id});
                }
                return res.send({message: "OK"});
            }
        }
    } catch (e) {
        return next(e);
    }
});

export default summaryRouter;



import express from "express";
import mongoose from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Summary from "../models/Summary";
import Education from "../models/Education";

const educationRouter = express.Router();

educationRouter.post('/', async (req, res, next) => {
    try {
        const education = await Education.create({
            education: req.body.education,
            desc: req.body.desc,
            summary: req.body.summary,
            educationalInstitution: req.body.educationalInstitution,
            expirationDate: req.body.expirationDate,
            startDate: req.body.startDate,
        });
        return res.send(education);
    } catch (e) {
        if (e instanceof mongoose.Error.ValidationError) {
            return res.status(400).send(e);
        } else {
            return next(e);
        }
    }
});

educationRouter.get('/', async (req, res, next) => {
    try {
        const educationRes = await Education.find();
        return res.send(educationRes);
    } catch (e) {
        return next(e);
    }
});

educationRouter.get('/:id', async (req, res) => {
    try {
        const result = await Education.findById(req.params.id);
        if (!result) {
            return res.sendStatus(404);
        }
        return res.send(result);
    } catch {
        return res.sendStatus(500);
    }
});

educationRouter.delete('/educationDelete/:id', auth, async (req, res, next) => {
    try {
        const user = (req as RequestWithUser).user;
        const education = await Education.findById(req.params.id);
        if (education) {
            if (education.user.toString() === user._id.toString()) {
                await Summary.deleteOne({_id: req.params.id});
                return res.send({message: "OK"});
            }
        }
    } catch (e) {
        return next(e);
    }
});

export default educationRouter;



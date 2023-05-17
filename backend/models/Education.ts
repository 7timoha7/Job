import mongoose, {Types} from "mongoose";
import Summary from "./Summary";
import User from "./User";


const Schema = mongoose.Schema;

const EducationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => User.findById(value),
            message: 'User does not exist'
        }
    },
    summary: {
        type: Schema.Types.ObjectId,
        ref: 'Summary',
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => Summary.findById(value),
            message: 'Summary does not exist'
        }
    },
    education: {
        type: String,
        required: true,
    },
    educationalInstitution: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
        required: true,
    },
    expirationDate: {
        type: String,
        required: true,
    },
    desc: String,
});

const Education = mongoose.model('Education', EducationSchema);
export default Education;
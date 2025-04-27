import mongoose from 'mongoose';

const petSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        species: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true, // Crea campos createdAt y updatedAt automáticamente
    }
);

const Pet = mongoose.model('Pet', petSchema);

export default Pet;

import { getCollectionDocumentByDate, getCollectionDocuments, createCollectionDocument, deleteCollectionDocument, createMoodDocument, getMoodDocuments, updateMoodDocument } from './database.js';



const get = async (request, response) => {
    const users = await getCollectionDocuments('data')
    response.send(users);
};

const post = async (request, response) => {
    const newUser = request.body;
    await createCollectionDocument('data', newUser);
    response.send({message: "We created this user...."})
};

const remove = async (request, response) => {
    const userToDelete = request.body;
    await deleteCollectionDocument('data', userToDelete);
    response.send({message: "We deleted this user...."})
};


const getMood = async (request, response) => {
    const mood = await getMoodDocuments('data')
    response.send(mood)
}

const postMood = async (request, response) => {
    const newMood = request.body;
    await createMoodDocument('data', newMood);
    response.send({message: "We added a new mood"})
}


const checkDuplicate = async (request, response) => {
    const newMood = request.body;

    // We need to know if this exists or not
    const document = await getCollectionDocumentByDate("data", newMood.date);

    if(document) {
        // We need to pass the newMood.. BUT! it also needs to ahve the ID of the existing document
        newMood._id = document._id;

        await updateMoodDocument("data", newMood)
        response.send({message: "We updated a new mood"})
    } else {
        await createMoodDocument('data', newMood);
        response.send({message: "We added a new mood"})
    }
}

export { get, post, remove, getMood, postMood, checkDuplicate }


import ChatModel from '../models/ChatModel.js'


export const createChat = async(req, res)=>{
  const newChat = new ChatModel({
    members: [req.body.senderId, req.body.receiverId]
  })

  try {
    const result = await newChat.save();
    res.status(200).json(result);
  } catch(error) {
    res.status(500).json(error)
  }
};

export const userChats = async(req, res)=>{
  try {
    const chat = await ChatModel.find({
      members: {$in: [req.params.userId]}
    })
    res.status(200).json(chat)
  } catch(error) {
    res.status(500).json(error)
  }
}

export const findChat = async (req, res) => {
    try {
      const { firstId, secondId } = req.params;
  
      // Check if the chat already exists
      let chat = await ChatModel.findOne({
        members: { $all: [firstId, secondId] }
      });
  
      // If chat does not exist, create a new one
      if (!chat) {
        const newChat = new ChatModel({
          members: [firstId, secondId]
        });
  
        chat = await newChat.save();
      }
  
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };
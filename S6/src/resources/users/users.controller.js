const commonResponse = (req, res) => {
    return res.json({ message: "Hello User" });
}


module.exports = {
    commonResponse
}

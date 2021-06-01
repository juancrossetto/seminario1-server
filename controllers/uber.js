
// get getAUTH
exports.authUber = async (req, res) => {
    return res
    .status(200)
    .json({ token: '123' })
};

exports.getEstimate = (req, res) => {
    return res
    .status(200)
    .json({ 
        price: 123123,
        time: 12
    })
};



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
            price: 24 * req.body.time,
            time: 12
        })
};


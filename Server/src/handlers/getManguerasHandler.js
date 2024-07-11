const {checkIfEmpty , parceoDB} = require('../utils')


const getManguerasHandler = async (req, res) => {
    try {
        const empty = await checkIfEmpty()
        if (empty) {
            await parceoDB()
            res.status(200).send("Tabla poblada")
        } else {
            return res.status(200).send('La tabla "Mangueras" ya tiene datos')
        }
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
}

module.exports = getManguerasHandler
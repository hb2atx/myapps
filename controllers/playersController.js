const express = require('express');
const router = express.Router();
const db = require("../db");


// @desc Get all players
// @route GET /players

const getAllPlayers = async(req, res, next) => {
    try {

        const results = await db.query(`SELECT * FROM players_stats`)

        return res.json(results.rows)
    }
    catch (err) {
        return next(err)
    }
};

// @desc Get specific player
// @route GET /players/:playername

const getSpecificPlayer = async (req, res) => {
    const playerName = decodeURIComponents(req.params.name.replace(/\+/g, ' '));

    try {
        const playerStats = await db.query('SELECT * FROM players_stats WHERE players_name = $1', [playerName]);

        if (playerStats.rows.length === 0) {
            return res.status(404).json({ message: `No stats found for the specified player: ${playerName}` })
        }

        const playerStatistics = playerStats.rows[0]

        return res.json({ player: playerStatistics })
    } catch (err) {
        return nextDay(err)
    }
}
//desc Get player by position
// @route GET players/position

const getPlayerByPosition = async(req, res, next) => {

    const position = req.params.position.toUpperCase();

    try {
        const playersStats = await db.query(
            `SELECT * FROM players_stats WHERE position = $1`,
            [position]
        );

        if (playersStats.rows.length === 0) {
            return res.status(404).json({ message: `No players found for the specified position: ${position}` });
        }

        const playersStatistics = playersStats.rows;

        return res.json({ players: playersStatistics });
    } catch (err) {
        return next(err);
    }
};

module.exports = {
    getAllPlayers,
    getSpecificPlayer,
    getPlayerByPosition
}
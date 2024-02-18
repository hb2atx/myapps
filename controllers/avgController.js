const express = require('express');
const router = express.Router();
const db = require("../db");


const getAllAvg = async (req, res, next) => {

    try {
        const results = await db.query(`SELECT * FROM avg_stats`);

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

};


const getAvgByPosition = async (req, res, next) => {

    const position = req.params.position.toUpperCase(); // Convert position to uppercase for consistency

    try {
        const results = await db.query(
            `SELECT
            AVG(avg_salary) AS avg_salary,
            AVG(avg_games_played) AS avg_games_played,
            AVG(avg_games_started_per_game) AS avg_games_started_per_game,
            AVG(avg_points_per_game) AS avg_points_per_game,
            AVG(avg_minutes_per_game) AS avg_minutes_per_game,
            AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
            AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
            AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
            AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
            AVG(avg_three_point_percentage) AS avg_three_point_percentage,
            AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
            AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
            AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
            AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
            AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
            AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
            AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
            AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
            AVG(avg_assists_per_game) AS avg_assists_per_game,
            AVG(avg_steals_per_game) AS avg_steals_per_game,
            AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
            AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
            FROM avg_stats
            WHERE position = $1
            GROUP BY position`,
            [position]
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }
};

const getAvgPg = async (req, res, next) => {

    try {
        const results = await db.query(
          `SELECT
          AVG(avg_salary) AS avg_salary,
          AVG(avg_games_played) AS avg_games_played,
          AVG(avg_games_started_per_game) AS avg_games_started_per_game,
          AVG(avg_points_per_game) AS avg_points_per_game,
          AVG(avg_minutes_per_game) AS avg_minutes_per_game,
          AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
          AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
          AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
          AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
          AVG(avg_three_point_percentage) AS avg_three_point_percentage,
          AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
          AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
          AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
          AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
          AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
          AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
          AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
          AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
          AVG(avg_assists_per_game) AS avg_assists_per_game,
          AVG(avg_steals_per_game) AS avg_steals_per_game,
          AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
          AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
          FROM avg_stats
          WHERE position = 'PG'
          GROUP BY position`
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

}

///////////////////// Get avg_stats from shooting guard //////////////////////////

const getAvgSg = async (req, res, next) => {

    try {
        const results = await db.query(
          `SELECT
          AVG(avg_salary) AS avg_salary,
          AVG(avg_games_played) AS avg_games_played,
          AVG(avg_games_started_per_game) AS avg_games_started_per_game,
          AVG(avg_points_per_game) AS avg_points_per_game,
          AVG(avg_minutes_per_game) AS avg_minutes_per_game,
          AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
          AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
          AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
          AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
          AVG(avg_three_point_percentage) AS avg_three_point_percentage,
          AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
          AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
          AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
          AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
          AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
          AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
          AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
          AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
          AVG(avg_assists_per_game) AS avg_assists_per_game,
          AVG(avg_steals_per_game) AS avg_steals_per_game,
          AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
          AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
          FROM avg_stats
          WHERE position = 'SG'
          GROUP BY position`
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

}

////////////////Get avg_stats from shooting forward //////////////////////////////////////

const getAvgSf = async (req, res, next) => {

    try {
        const results = await db.query(
          `SELECT
          AVG(avg_salary) AS avg_salary,
          AVG(avg_games_played) AS avg_games_played,
          AVG(avg_games_started_per_game) AS avg_games_started_per_game,
          AVG(avg_points_per_game) AS avg_points_per_game,
          AVG(avg_minutes_per_game) AS avg_minutes_per_game,
          AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
          AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
          AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
          AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
          AVG(avg_three_point_percentage) AS avg_three_point_percentage,
          AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
          AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
          AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
          AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
          AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
          AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
          AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
          AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
          AVG(avg_assists_per_game) AS avg_assists_per_game,
          AVG(avg_steals_per_game) AS avg_steals_per_game,
          AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
          AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
          FROM avg_stats
          WHERE position = 'SF'
          GROUP BY position`
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

}

///////////////////////// Get avg_stats from power forward //////////////////////////////////////////

const getAvgPf = async (req, res, next) => {

    try {
        const results = await db.query(
          `SELECT
          AVG(avg_salary) AS avg_salary,
          AVG(avg_games_played) AS avg_games_played,
          AVG(avg_games_started_per_game) AS avg_games_started_per_game,
          AVG(avg_points_per_game) AS avg_points_per_game,
          AVG(avg_minutes_per_game) AS avg_minutes_per_game,
          AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
          AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
          AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
          AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
          AVG(avg_three_point_percentage) AS avg_three_point_percentage,
          AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
          AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
          AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
          AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
          AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
          AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
          AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
          AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
          AVG(avg_assists_per_game) AS avg_assists_per_game,
          AVG(avg_steals_per_game) AS avg_steals_per_game,
          AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
          AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
          FROM avg_stats
          WHERE position = 'PF'
          GROUP BY position`
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

}

/////////////////// Get avg_stats from center ////////////////////////////////////////////////

const getAvgC = async (req, res, next) => {

    try {
        const results = await db.query(
          `SELECT
          AVG(avg_salary) AS avg_salary,
          AVG(avg_games_played) AS avg_games_played,
          AVG(avg_games_started_per_game) AS avg_games_started_per_game,
          AVG(avg_points_per_game) AS avg_points_per_game,
          AVG(avg_minutes_per_game) AS avg_minutes_per_game,
          AVG(avg_field_goals_per_game) AS avg_field_goals_per_game,
          AVG(avg_field_goal_attempts_per_game) AS avg_field_goal_attempts_per_game,
          AVG(avg_field_goal_percentage) AS avg_field_goal_percentage,
          AVG(avg_three_point_field_goals_per_game) AS avg_three_point_field_goals_per_game,
          AVG(avg_three_point_percentage) AS avg_three_point_percentage,
          AVG(avg_two_point_field_goals_per_game) AS avg_two_point_field_goals_per_game,
          AVG(avg_two_point_field_goal_attempts_per_game) AS avg_two_point_field_goal_attempts_per_game,
          AVG(avg_two_point_field_goal_percentage) AS avg_two_point_field_goal_percentage,
          AVG(avg_free_throw_attempts_per_game) AS avg_free_throw_attempts_per_game,
          AVG(avg_free_throws_per_game) AS avg_free_throws_per_game,
          AVG(avg_offensive_rebounds_per_game) AS avg_offensive_rebounds_per_game,
          AVG(avg_defensive_rebounds_per_game) AS avg_defensive_rebounds_per_game,
          AVG(avg_total_rebounds_per_game) AS avg_total_rebounds_per_game,
          AVG(avg_assists_per_game) AS avg_assists_per_game,
          AVG(avg_steals_per_game) AS avg_steals_per_game,
          AVG(avg_avg_blocks_per_game) AS avg_avg_blocks_per_game,
          AVG(avg_turnovers_per_game) AS avg_turnovers_per_game
          FROM avg_stats
          WHERE position = 'C'
          GROUP BY position`
        );

        const roundedResults = results.rows.map(row => {
            const roundedRow = {};
            for (const key in row) {
                if (typeof row[key] === 'number') {
                    roundedRow[key] = Math.round(row[key] * 100) / 100; // Rounding to 2 decimal places
                } else {
                    roundedRow[key] = row[key];
                }
            }
            return roundedRow;
        });

        return res.json(roundedResults);
    } catch (err) {
        return next(err);
    }

}

module.exports = {
    getAllAvg,
    getAvgByPosition,
    getAvgPg,
    getAvgSg,
    getAvgSf,
    getAvgPf,
    getAvgC
}
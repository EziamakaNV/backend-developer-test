/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */
import database from './Db/index';

const teams = process.env.NODE_ENV === 'production' ? 'teams' : 'testTeams';

class TeamModel {
  static findTeam(teamName) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(teams).findOne({ name: teamName }).then((result) => resolve(result))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static addTeam(teamName, numOfPlayers) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(teams)
          .insertOne({ name: teamName, players: numOfPlayers })
          .then((result) => resolve(result.ops[0]))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static removeTeam(teamName) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(teams)
          .findOneAndDelete({ name: teamName }).then((result) => resolve(result.value))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static updateTeam(teamName, numOfPlayers) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        client.db().collection(teams)
          .findOneAndUpdate({ name: teamName }, { $set: { players: numOfPlayers } }, { returnOriginal: false })
          .then((result) => resolve(result.value))
          .catch((err) => reject(err));
      }).catch((err) => reject(err));
    });
  }

  static getTeams(minPlayers, maxPlayers) {
    return new Promise((resolve, reject) => {
      database.then((client) => {
        const query = (minPlayers && maxPlayers) ? { players: { $gte: Number(minPlayers), $lte: Number(maxPlayers) } } : {};
        client.db().collection(teams).find(query)
          .toArray((err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          });
      }).catch((err) => reject(err));
    });
  }
}

export default TeamModel;

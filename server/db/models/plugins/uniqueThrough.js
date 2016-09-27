import Sequelize from 'sequelize';
import _ from 'lodash';

export default function (deepColumn) {
  return {
    through(nearColumn) {
      return {
        type: Sequelize.VIRTUAL,
        get() {
          const key = `._unique_${deepColumn}_through_${nearColumn}_`;
          if (this[key]) return this[key];
          let collection = _.chain(this[nearColumn])
          .flatMap(obj => obj[deepColumn])
          .filter(_.isObject)
          .uniqBy(model => model.id)
          .value();
          if (!collection.length) return;
          this[key] = collection;
          return this[key];
        }
      };
    }
  };
}

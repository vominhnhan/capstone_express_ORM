import _ from "lodash";

const getInfoData = ({ fileds = [], object = {} }) => {
  return _.pick(object, fileds);
};

export default getInfoData;

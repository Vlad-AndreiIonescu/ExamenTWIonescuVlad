function responseForMultipleRecords(Model, records, response) {
  if (records.length > 0) {
    response.json(records);
  } else {
    response.status(404).json({
      message: "Couldn't retrieve " + Model.name,
    });
  }
}

async function handleSelectRecordsSorted(Model, field, direction, response) {
  let records = await Model.findAll({ order: [[field, direction]] });
  console.log("records ");
  console.log(records);
  responseForMultipleRecords(Model, records, response);
}

async function handleSelectRecordsPaginated(Model, page, pageSize, response) {
  let records = await Model.findAndCountAll({
    offset: page - 1,
    limit: Number(pageSize),
  });
  console.log("records ");
  console.log(records);
  if (records.count > 0) {
    return response.json(records);
  } else {
    return response.status(404).json({
      message: "Couldn't retrieve " + Model.name,
    });
  }
}

async function handleSelectRecordsFiltered(Model, fields, response) {
  let records = await Model.findAll({ where: fields });
  console.log("records ");
  console.log(records);
  responseForMultipleRecords(Model, records, response);
}
module.exports = {
  handleSelectRecordsSorted,
  handleSelectRecordsPaginated,
  handleSelectRecordsFiltered,
};

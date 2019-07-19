module.exports = data => {
  data = data.toString('utf-8')

  return data.split('\n')
    .map((line, i) => {
    const parsedLine = line.split(';')

    const doc = {
      userName: parsedLine[0] || false,
      cep: parsedLine[1] || false,
      address: parsedLine[2] || false,
      number: parsedLine[3] || false,
      complement: parsedLine[4],
      invoice: parsedLine[5] || false,
      order: parsedLine[6],
      phone: parsedLine[7],
      mobile: parsedLine[8],
      deliveryType: parsedLine[9] || false,
      websiteRef: parsedLine[10]
    };

    if (!doc.userName || !doc.cep || !doc.address || !doc.number || !doc.invoice || !doc.deliveryType) {
      doc.log = [
        i + 1,
        `Error on line ${i + 1}`,
        `Missing username? ${!doc.userName}`,
        `Missing CEP? ${!doc.cep}`,
        `Missing address? ${!doc.address}`,
        `Missing number? ${!doc.number}`,
        `Missing invoice? ${!doc.invoice}`,
        `Missing delivery type? ${!doc.deliveryType}`
      ]
    }

    return doc
  })
}
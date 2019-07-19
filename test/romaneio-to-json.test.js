const fs = require('fs')
const { expect } = require('chai')
const romaneioToJSON = require('../shared/romaneio-to-json')

describe('Test handler', () => {
  let fileData
  let fileErrorData

  before(done => {
    fs.readFile(`${__dirname}/data/romaneio.txt`, (err, data) => {
      if (err) {
        return  done(err)
      }

      fileData = data
      fs.readFile(`${__dirname}/data/romaneio-err.txt`, (err, data) => {
        if (err) {
          return  done(err)
        }
        
        fileErrorData = data
        done()
      })
    })
  })

  it('Should parse all the lines and line 0 should have all properties', done => {
    const data = romaneioToJSON(fileData)
console.log(data)
    expect(data.length).to.equals(49)
    expect(data[0]).to.have.property('userName')
    expect(data[0]).to.have.property('cep')
    expect(data[0]).to.have.property('address')
    expect(data[0]).to.have.property('number')
    expect(data[0]).to.have.property('complement')
    expect(data[0]).to.have.property('invoice')
    expect(data[0]).to.have.property('order')
    expect(data[0]).to.have.property('phone')
    expect(data[0]).to.have.property('mobile')
    expect(data[0]).to.have.property('deliveryType')
    done()
  })

  it('Should create log field for lines with missing data', done => {
    const data = romaneioToJSON(fileErrorData)
    expect(data.length).to.equals(13)
    expect(data[0]).to.not.have.property('log')
    expect(data[1]).to.have.property('log')
    expect(data[1].log[0]).to.equals(2)
    expect(data[1].log[1]).to.equals('Error on line 2')
    expect(data[2]).to.not.have.property('log')
    expect(data[3]).to.have.property('log')
    //expect(log[3]).
    expect(data[3].log).to.be.an('array')
    expect(data[4]).to.have.property('log')
    expect(data[6]).to.have.property('log')
    expect(data[6].log[0]).to.equals(7)
    expect(data[6].log[6]).to.equals('Missing invoice? true')
    done()
  })
})
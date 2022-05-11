const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Busca todas as vendas no BD, getAll-sales-model', () => {
  describe('quando não existe nenhuma venda', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('quando existem vendas registradas no BD', () => {

    const resultExecute = [[
      {
        saleId: 1,
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]

    before(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await salesModel.getAll();

      expect(result).to.be.an('object');
    });

    it(`o objeto que está no array contêm os atributos saleId, date,
    productId, quantity`, async () => {
      const [result] = await salesModel.getAll();

      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      );
    });
  });
});

describe('Busca as vendas por id no BD, getById-sales-model', () => {

  const saleIdMock = [[
    {
      date: '2022-05-10 16:03:40',
      productId: 1,
      quantity: 5
    }
  ]]

  before(() => {
    sinon.stub(connection, 'execute').resolves(saleIdMock);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um array', async () => {
    const result = await salesModel.getById();

    expect(result).to.be.an('array');
  });

  it('o objeto que está no array contêm os atributos date, productId, quantity', async () => {
    const [result] = await salesModel.getById();

    expect(result).to.be.includes.all.keys(
      'date',
      'productId',
      'quantity'
    );
  });
});
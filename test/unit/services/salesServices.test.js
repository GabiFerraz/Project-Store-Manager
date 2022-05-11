const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Busca todos os produtos no BD, getAll-products-service', () => {
  describe('quando não existe nenhuma venda', () => {

    const resultExecute = [];

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(resultExecute);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.empty;
    });
  });

  describe('quando existem produtos registrados no BD', () => {

    const resultExecute = [
      {
        saleId: 1,
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(resultExecute);
    });

    after(() => {
      salesModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await salesService.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await salesService.getAll();

      expect(result).to.be.an('object');
    });

    it(`o objeto que está no array contêm os atributos saleId, date,
    productId, quantity`, async () => {
      const [result] = await salesService.getAll();

      expect(result).to.be.includes.all.keys(
        'saleId',
        'date',
        'productId',
        'quantity'
      );
    });
  });
});

describe('Busca os produtos por id no BD, getById-products-service', () => {

  const salesIdMock = [
    {
      date: '2022-05-10 16:03:40',
      productId: 1,
      quantity: 5
    }
  ]

  before(() => {
    sinon.stub(salesModel, 'getById').resolves(salesIdMock);
  });

  after(() => {
    salesModel.getById.restore();
  });

  it('retorna um array', async () => {
    const result = await salesService.getById();

    expect(result).to.be.an('array');
  });

  it('o array não está vazio', async () => {
    const result = await salesService.getById();

    expect(result).to.be.not.empty;
  });

  it('o array possui objetos', async () => {
    const [result] = await salesService.getById();

    expect(result).to.be.an('object');
  });

  it('o objeto contêm os atributos date, productId, quantity', async () => {
    const [result] = await salesService.getById();

    expect(result).to.be.includes.all.keys(
      'date',
      'productId',
      'quantity'
    );
  });
});
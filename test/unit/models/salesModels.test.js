const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');

describe('Busca todas as vendas no BD, getAll-sales-model', () => {
  describe('quando não existe nenhuma venda', () => {

    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um array que está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
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

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um array que não está vazio', async () => {
      const result = await salesModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.be.not.empty;
    });

    it(`o array possui objetos com os atributos saleId, date,
    productId, quantity`, async () => {
      const [result] = await salesModel.getAll();

      expect(result).to.be.an('object');
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
  describe('quando o retorno da venda dá certo', () => {

    const saleIdMock = [[
      {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]

    const id = 1;
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(saleIdMock);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });
  
    it('retorna um array', async () => {
      const result = await salesModel.getById(id);
  
      expect(result).to.be.an('array');
    });
  
    it('o objeto que está no array contêm os atributos date, productId, quantity', async () => {
      const [result] = await salesModel.getById(id);
  
      expect(result).to.be.includes.all.keys(
        'date',
        'productId',
        'quantity'
      );
    });
  });
});
const { expect } = require('chai');
const sinon = require('sinon');

const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Busca todas as vendas no BD, getAll-sales-service', () => {
  describe('quando não existe nenhuma venda', () => {

    const resultExecute = [];

    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(resultExecute);
    });

    afterEach(() => {
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

  describe('quando existem vendas registradas no BD', () => {

    const resultExecute = [
      {
        saleId: 1,
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]

    beforeEach(() => {
      sinon.stub(salesModel, 'getAll').resolves(resultExecute);
    });

    afterEach(() => {
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

describe('Busca as vendas por id no BD, getById-sales-service', () => {
  describe('Quando o retorno da venda dá errado', () => {

    
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves([]);
    });
  
    afterEach(() => {
      salesModel.getById.restore();
    });

    it('retorna um erro', async () => {
      try {
        await salesService.getById(1);
        
      } catch (error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Sale not found');
      }
    });
  });

  describe('Quando o retorno da venda dá certo', () => {
    const salesIdMock = [
      {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]
  
    beforeEach(() => {
      sinon.stub(salesModel, 'getById').resolves(salesIdMock);
    });
  
    afterEach(() => {
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
});
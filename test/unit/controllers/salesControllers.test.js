const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Chama o controller getAll', () => {
  describe('quando não existe nenhuma venda', () => {

    const request = {};
    const response = [];

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves([]);
    });

    afterEach(() => {
      salesService.getAll.restore();
    });

    it('retorna um array', async () => {
      await salesController.getAll(request, response);

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      await salesController.getAll(request, response);

      expect(response).to.be.empty;
    });
  });

  describe('quando existem vendas registradas no BD', () => {

    const request = {};
    const response = {};

    const resultExecute = [[
      {
        saleId: 1,
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(resultExecute);
    });

    afterEach(() => {
      salesService.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é retornado o método json contendo um array', async () => {
      await salesController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Chama o controller getById', () => {
  describe('Quando o retorno da venda dá certo', () => {

    const request = {};
    const response = {};
    let next = () => {};

    const salesIdMock = [[
      {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]
  
    beforeEach(() => {
      request.params = { id: 1 };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getById').resolves(salesIdMock);
    });
  
    afterEach(() => {
      salesService.getById.restore();
    });
  
    it('é chamado o método "status" passando o código 200 se der tudo certo', async () => {
      await salesController.getById(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é retornado o método json contendo um array se der tudo certo', async () => {
      await salesController.getById(request, response, next);
  
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
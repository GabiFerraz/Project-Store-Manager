const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Chama o controller getAll', () => {
  describe('quando não existe nenhuma venda', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(salesService, 'getAll').resolves([]);
    });

    afterEach(() => {
      salesService.getAll.restore();
    });

    it('retorna um array que está vazio', async () => {
      await salesController.getAll(request, response);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await salesController.getAll({}, {}, next);

      expect(next.calledOnce).to.be.true;
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

    it(`é chamado o método "status" passando o código 200, e retornado o método
    json contendo um array`, async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Chama o controller getById', () => {
  describe('quando o retorno da venda dá errado', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(salesService, 'getById').resolves([]);
    });

    afterEach(() => {
      salesService.getById.restore();
    });

    it('retorna um array que está vazio', async () => {
      await salesController.getById(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await salesController.getById({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando o retorno da venda dá certo', () => {

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
  
    it(`é chamado o método "status" passando o código 200, retornado o método
    json contendo um array`, async () => {
      await salesController.getById(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Chama o controller createSale', () => {
  describe('quando a venda não é criada', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(salesService, 'createSale').resolves([]);
    });

    afterEach(() => {
      salesService.createSale.restore();
    });

    it('retorna um array que está vazio', async () => {
      await salesController.createSale(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await salesController.createSale({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando a venda é criada com sucesso', () => {

    const request = {};
    const response = {};
    let next = () => {};

    const createMock = [[
      {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]
  
    beforeEach(() => {
      request.body = {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves(createMock);
    });
  
    afterEach(() => {
      salesService.createSale.restore();
    });
  
    it(`é chamado o método "status" passando o código 201, e retornado o método
    json contendo um array`, async () => {
      await salesController.createSale(request, response, next);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});

describe('Chama o controller updateSale', () => {
  describe('quando a atualização da venda não dá certo', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(salesService, 'updateSale').resolves([]);
    });

    afterEach(() => {
      salesService.updateSale.restore();
    });

    it('retorna um array que está vazio', async () => {
      await salesController.updateSale(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await salesController.updateSale({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando a atualização da venda dá certo', () => {

    const request = {};
    const response = {};
    let next = () => {};

    const updateMock = [[
      {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      }
    ]]
  
    beforeEach(() => {
      request.params = { id: 1 };
      request.body = {
        date: '2022-05-10 16:03:40',
        productId: 1,
        quantity: 5
      };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateSale').resolves(updateMock);
    });
  
    afterEach(() => {
      salesService.updateSale.restore();
    });
  
    it(`é chamado o método "status" passando o código 200, e retornado o método
    json contendo um array`, async () => {
      await salesController.updateSale(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.array)).to.be.equal(true);
    });
  });
});
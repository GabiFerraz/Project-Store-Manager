const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Chamada do controller getAll', () => {
  describe('Quando não existem produtos no banco', () => {
    const request = {};
    const response = [];
    const next = () => {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAll').resolves([]);
    });
    
    after(() => {
      productsServices.getAll.restore();
    });

    it('retorna um array', async () => {
      await productsController.getAll(request, response, next);

      expect(response).to.be.an('array');
    });

    it('o array está vazio', async () => {
      await productsController.getAll(request, response, next);

      expect(response).to.be.empty;
    });
  });

  describe('Quando existem produtos no banco', () => {
    const request = {};
    const response = {};

    const productsMock = 
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAll').resolves(productsMock);
    });
    
    after(() => {
      productsServices.getAll.restore();
    });

    it('é chamado o método "status" passando o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é retornado o método json contendo um objeto', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Chamada do controller getById', () => {
  describe('Quando o retorno do produto der errado', () => {

    const request = {};
    const response = {};
    let next = () => {};
  
    before(() => {
      request.params = { id: 1 };
      next = sinon.stub(); // estou dizendo que o meu next é uma função mocada
      
      sinon.stub(productsServices, 'getById').resolves(undefined);
    });
  
    after(() => {
      productsServices.getById.restore();
    });

    it('não é possível retornar um produto que não existe', async () => {
      await productsController.getById(request, response, next);

      expect(next.calledWith({ status: 404, message: 'Product not found' })).to.be.equal(true);
    });
  });

  describe('Quando o retorno do produto der certo', () => {

    const request = {};
    const response = {};
    const next = () => {};
  
    const productIdMock = 
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    }
  
    before(() => {
      request.params = { id: 1 };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      sinon.stub(productsServices, 'getById').resolves(productIdMock);
    });
  
    after(() => {
      productsServices.getById.restore();
    });
  
    it('é chamado o método "status" passando o código 200 se der tudo certo', async () => {
      await productsController.getById(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  
    it('é retornado o método json contendo um objeto se der tudo certo', async () => {
      await productsController.getById(request, response, next);
  
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Chamada do controller createProduct', () => {
  describe('Quando a criação do produto der certo', () => {

    const request = {};
    const response = {};
    let next = () => {};

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };
  
    before(() => {
      request.body = { name: 'Headset', quantity: 5 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.stub(); // estou dizendo que o meu next é uma função mocada
      
      sinon.stub(productsServices, 'createProduct').resolves(newProductMock);
    });
  
    after(() => {
      productsServices.createProduct.restore();
    });

    it('é chamado o método "status" passando o código 201 se der tudo certo', async () => {
      await productsController.createProduct(request, response, next);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  
    it('é retornado o método json contendo um objeto se der tudo certo', async () => {
      await productsController.createProduct(request, response, next);
  
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});
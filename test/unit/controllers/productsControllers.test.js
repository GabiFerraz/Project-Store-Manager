const { expect } = require('chai');
const sinon = require('sinon');

const productsServices = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Chamada do controller getAll', () => {
  describe('quando não existem produtos no banco', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(productsServices, 'getAll').resolves([]);
    });
    
    afterEach(() => {
      productsServices.getAll.restore();
    });

    it('retorna um array que está vazio', async () => {
      await productsController.getAll(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await productsController.getAll({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando existem produtos no banco', () => {
    const request = {};
    const response = {};
    const next = () => {};

    const productsMock = {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    };

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(productsServices, 'getAll').resolves(productsMock);
    });
    
    afterEach(() => {
      productsServices.getAll.restore();
    });

    it(`é chamado o método "status" passando o código 200, e
    retornado o método json contendo um objeto`, async () => {
      await productsController.getAll(request, response, next);

      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Chamada do controller getById', () => {
  describe('quando o retorno do produto não dá certo', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(productsServices, 'getById').resolves([]);
    });
    
    afterEach(() => {
      productsServices.getById.restore();
    });

    it('retorna um array que está vazio', async () => {
      await productsController.getById(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await productsController.getById({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando o retorno do produto der certo', () => {
    const request = {};
    const response = {};
    const next = () => {};
  
    const productIdMock = 
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    };
  
    beforeEach(() => {
      request.params = { id: 1 };
  
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      sinon.stub(productsServices, 'getById').resolves(productIdMock);
    });
  
    afterEach(() => {
      productsServices.getById.restore();
    });
  
    it(`é chamado o método "status" passando o código 200, e
    retornado o método json contendo um objeto`, async () => {
      await productsController.getById(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Chamada do controller createProduct', () => {
  describe('quando a criação do produto não dá certo', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(productsServices, 'createProduct').resolves([]);
    });
    
    afterEach(() => {
      productsServices.createProduct.restore();
    });

    it('retorna um array que está vazio', async () => {
      await productsController.createProduct(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await productsController.createProduct({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando a criação do produto der certo', () => {
    const request = {};
    const response = {};
    let next = () => {};

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };
  
    beforeEach(() => {
      request.body = { name: 'Headset', quantity: 5 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.stub(); // estou dizendo que o meu next é uma função mocada
      
      sinon.stub(productsServices, 'createProduct').resolves(newProductMock);
    });
  
    afterEach(() => {
      productsServices.createProduct.restore();
    });

    it(`é chamado o método "status" passando o código 201, e
    retornado o método json contendo um objeto`, async () => {
      await productsController.createProduct(request, response, next);
  
      expect(response.status.calledWith(201)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

describe('Chamada do controller updateProduct', () => {
  describe('quando a atualização do produto não dá certo', () => {
    const request = {};
    const response = [];
    let next;

    beforeEach(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.spy();

      sinon.stub(productsServices, 'updateProduct').resolves([]);
    });
    
    afterEach(() => {
      productsServices.updateProduct.restore();
    });

    it('retorna um array que está vazio', async () => {
      await productsController.updateProduct(request, response, next);

      expect(response).to.be.an('array');
      expect(response).to.be.empty;
    });

    it('o next é chamando uma vez', async () => {
      await productsController.updateProduct({}, {}, next);

      expect(next.calledOnce).to.be.true;
    });
  });

  describe('quando a atualização do produto der certo', () => {
    const request = {};
    const response = {};
    let next = () => {};

    const updateProductMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };
  
    beforeEach(() => {
      request.params = { id: 1 };
      request.body = { name: 'Headset', quantity: 5 };

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      next = sinon.stub(); // estou dizendo que o meu next é uma função mocada
      
      sinon.stub(productsServices, 'updateProduct').resolves(updateProductMock);
    });
  
    afterEach(() => {
      productsServices.updateProduct.restore();
    });

    it(`é chamado o método "status" passando o código 200, e
    retornado o método json contendo um objeto`, async () => {
      await productsController.updateProduct(request, response, next);
  
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(sinon.match.object)).to.be.equal(true);
    });
  });
});

// Tentativa de testar o delete, retornar depois para tentar concluir:
// describe('Chamada do controller deleteProduct', () => {
//   describe('quando o produto é apagado com sucesso', () => {

//     const request = {};
//     const response = {};
//     let next = () => {};

//     beforeEach(() => {
//       request.params = { id: 1 };
      
//       response.status = sinon.stub().returns(response);
//       response.json = sinon.stub().returns();
      
//       sinon.stub(productsServices, 'deleteProduct').resolves();
//     });
  
//     afterEach(() => {
//       productsServices.deleteProduct.restore();
//     });

//     it('é chamado o método "status" passando o código 204 se der tudo certo', async () => {
//       await productsController.deleteProduct(request, response, next);
  
//       expect(response.status.calledWith(204)).to.be.equal(true);
//     });
  
//     it('é retornado o método json contendo um objeto se der tudo certo', async () => {
//       await productsController.deleteProduct(request, response, next);
  
//       expect(response.json).to.be.empty;
//     });
//   });
// });

// A ideia de usar o spy para poder testar o uso do next eu tirei do stackoverflow:
// https://stackoverflow.com/questions/34516951/express-middleware-testing-mocha-chai
// https://stackoverflow.com/questions/29800733/verifying-function-call-and-inspecting-arguments-using-sinon-spies
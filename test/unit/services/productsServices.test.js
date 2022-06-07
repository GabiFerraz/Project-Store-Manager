const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsService');

describe('Busca todos os produtos no BD, getAll-products-service', () => {
  describe('quando não existe nenhum produto criado', () => {

    const resultExecute = [];

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultExecute);
    });

    afterEach(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array que está vazio', async () => {
      const result = await productsServices.getAll();

      expect(result).to.be.an('array');
      expect(result).to.be.empty;
    });
  });

  describe('quando existem produtos registrados no BD', () => {

    const resultExecute = [
      {
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10,
      }
    ];

    beforeEach(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultExecute);
    });

    afterEach(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array que não está vazio', async () => {
      const result = await productsServices.getAll();

      expect(result).to.be.an('array');
      expect(result).to.be.not.empty;
    });

    it('o array possui objetos com os atributos id, name, quantity', async () => {
      const [result] = await productsServices.getAll();

      expect(result).to.be.an('object');
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Busca os produtos por id no BD, getById-products-service', () => {
  describe('quando o retorno do produto der errado', () => {

    const productMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };
  
    beforeEach(() => {
      const idExample = 2;
            
      sinon.stub(productsModel, 'getById').resolves(idExample);
    });
  
    afterEach(() => {
      productsModel.getById.restore();
    });

    it('retorna um erro', async () => {
      try {
        await productsServices.getById(productMock);
        
      } catch (error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Product not found');
      }
    });
  });

  describe('quando o retorno do produto dá certo', () => {

    const productIdMock = 
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    }

    const id = 1;
  
    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(productIdMock);
    });
  
    afterEach(() => {
      productsModel.getById.restore();
    });
  
    it('retorna um objeto com os atributos id, name, quantity', async () => {
      const result = await productsServices.getById(id);
  
      expect(result).to.be.an('object');
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Cria um novo produto no BD, createProduct-service', () => {
  describe('quando o name já existe', () => {
    
    const productMock = {
      name: 'Headset',
      quantity: 5,
    };

    beforeEach(() => {
      const nameExample = 'Headset';

      sinon.stub(productsModel, 'getByName').resolves({ name: nameExample });
    });

    afterEach(() => {
      productsModel.getByName.restore();
    })

    it('retorna um erro', async () => {
      try {
        await productsServices.createProduct(productMock);
        
      } catch (error) {
        expect(error.status).to.be.equal(409);
        expect(error.message).to.be.equal('Product already exists');
      }
    });
  });

  describe('quando o produto é inserido com sucesso', () => {

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };

    beforeEach(() => {
      const idExample = 1;

      sinon.stub(productsModel, 'getByName').resolves();
      sinon.stub(productsModel, 'createProduct')
        .resolves({ id: idExample, ...newProductMock });
    });

    afterEach(() => {
      productsModel.getByName.restore();
      productsModel.createProduct.restore();
    })

    it('retorna um objeto que possui o "id" do novo produto inserido', async () => {
      const response = await productsServices
        .createProduct(newProductMock.name, newProductMock.quantity);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
    });
  });
});

describe('Atualiza um produto no BD, updateProduct-service', () => {
  describe('quando a atualização do produto dá errado', () => {
    const updateProductMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };

    const id = 1;

    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(undefined);
      sinon.stub(productsModel, 'updateProduct').resolves(updateProductMock);
    });

    afterEach(() => {
      productsModel.getById.restore();
      productsModel.updateProduct.restore();
    });

    it('quando o id não existe, retorna um erro', async () => {
      // Devaneios e tentativas de tratar o erro de outra forma, tentar olhar novamente depois:
      // await assert.throws(async () => {
      //   await productsServices.updateProduct(updateProductMock.id,
      //     updateProductMock.name, updateProductMock.quantity);
      // }, Error, { status: 404, message: 'Product not found' });
      //https://stackoverflow.com/questions/63511399/mocha-assert-asynchronous-function-throws-exception

      try {
        await productsServices.updateProduct(id);
        
      } catch (error) {
        expect(error.status).to.be.equal(404);
        expect(error.message).to.be.equal('Product not found');
      }
    });    
  });

  describe('quando a atualização do produto dá certo', () => {
    const updateProductMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };

    beforeEach(() => {
      sinon.stub(productsModel, 'getById').resolves(1);
      sinon.stub(productsModel, 'updateProduct').resolves(updateProductMock);
    });

    afterEach(() => {
      productsModel.getById.restore();
      productsModel.updateProduct.restore();
    });

    it(`retorna um objeto atualizado que possui as chaves id,
    name e quantity`, async () => {
      const response = await productsServices.updateProduct(updateProductMock.id,
        updateProductMock.name, updateProductMock.quantity);

      expect(response).to.be.an('object');
      expect(response).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});

// Tentativas de testar o delete, voltar para tentar de novo depois:
// describe('Deleta um produto do BD, deleteProduct-service', () => {
//   describe('quando o produto é apagado com sucesso', () => {

//     let prodModIdStub;
//     let prodModUpdateStub;

//     const id = 1;

//     beforeEach(() => {
      
//       // prodModIdStub = sinon.stub(productsModel, 'getById');
//       prodModUpdateStub = sinon.stub(productsModel, 'updateProduct');
//       // quando eu coloco um .resolves eu espero um retorno e, nesse caso,
//       // eu não quero um retorno, quero testar só a execução dele.
//     });

//     afterEach(() => {
//       // prodModIdStub.restore();
//       prodModUpdateStub.restore();
//     });

//     it('não retorna nada', async () => {
//       await productsServices.deleteProduct(id);

//       // expect(prodModIdStub.calledOnce).to.be.true;
//       expect(prodModUpdateStub.calledOnce).to.be.true;
//       // expect(prodModUpdateStub.getCall(0).args)
//       //   .to.deep.equal(1);
//     });
//   });
// });
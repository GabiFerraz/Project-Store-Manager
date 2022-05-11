const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const productsServices = require('../../../services/productsService');

describe('Busca todos os produtos no BD, getAll-products-service', () => {
  describe('quando não existe nenhum produto criado', () => {

    const resultExecute = [];

    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultExecute);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await productsServices.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productsServices.getAll();

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
    ]

    before(() => {
      sinon.stub(productsModel, 'getAll')
        .resolves(resultExecute);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const result = await productsServices.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await productsServices.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await productsServices.getAll();

      expect(result).to.be.an('object');
    });

    it('o objeto que está no array contêm os atributos id, name, quantity', async () => {
      const [result] = await productsServices.getAll();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Busca os produtos por id no BD, getById-products-service', () => {
  describe('Quando o retorno do produto der errado', () => {

    const productMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };
  
    before(() => {
      const idExample = 2;
            
      sinon.stub(productsModel, 'getById').resolves(idExample);
    });
  
    after(() => {
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

  describe('Quando o retorno do produto dá certo', () => {

    const productIdMock = 
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    }
  
    before(() => {
      sinon.stub(productsModel, 'getById').resolves(productIdMock);
    });
  
    after(() => {
      productsModel.getById.restore();
    });
  
    it('retorna um objeto', async () => {
      const result = await productsServices.getById();
  
      expect(result).to.be.an('object');
    });
  
    it('o objeto contêm os atributos id, name, quantity', async () => {
      const result = await productsServices.getById();
  
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Cria um novo produto no BD, createProduct-service', () => {
  describe('Quando o name já existe', () => {
    
    const productMock = {
      name: 'Headset',
      quantity: 5,
    };

    before(() => {
      const nameExample = 'Headset';

      sinon.stub(productsModel, 'getByName').resolves({ name: nameExample });
    });

    after(() => {
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

  describe('Quando é inserido com sucesso', () => {

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };

    before(() => {
      const idExample = 1;

      sinon.stub(productsModel, 'getByName').resolves();
      sinon.stub(productsModel, 'createProduct').resolves({ id: idExample, ...newProductMock });
    });

    after(() => {
      productsModel.getByName.restore();
      productsModel.createProduct.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsServices
        .createProduct(newProductMock.name, newProductMock.quantity);

      expect(response).to.be.an('object');
    });

    it('o objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsServices
        .createProduct(newProductMock.name, newProductMock.quantity);

      expect(response).to.have.a.property('id');
    });
  });
});
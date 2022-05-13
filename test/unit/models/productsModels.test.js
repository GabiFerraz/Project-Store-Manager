const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Busca todos os produtos no BD, getAll-products-model', () => {
  describe('quando não existe nenhum produto criado', () => {

    const resultExecute = [[]];

    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(resultExecute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um array que está vazio', async () => {
      const result = await productsModel.getAll();

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
      sinon.stub(connection, 'execute').resolves([resultExecute]);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um array que não está vazio', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
      expect(result).to.be.not.empty;
    });

    it('o array possui objetos com os atributos id, name e quantity', async () => {
      const [result] = await productsModel.getAll();

      expect(result).to.be.an('object');
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Busca os produtos por id no BD, getById-products-model', () => {
  describe('quando o retorno do produto com id der errado', () => {

    const productIdMock = [[{}]];
    const id = 1;
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(productIdMock);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um objeto que está vazio', async () => {
      const result = await productsModel.getById(id);
  
      expect(result).to.be.an('object');
      expect(result).to.be.empty;
    });
  });

  describe('quando o retorno do produto com id der certo', () => {

    const productIdMock = [[
      {
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10,
      }
    ]];

    const id = 1;
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(productIdMock);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });
  
    it('retorna um objeto com os atributos id, name e quantity', async () => {
      const result = await productsModel.getById(id);
  
      expect(result).to.be.an('object');
      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Busca todos os nomes dos produtos no BD, getByName-products-model', () => {
  describe('quando o retorno do produto com nome der errado', () => {
    const productNameMock = [[{}]];
    const name = 'Martelo do Thor';
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(productNameMock);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um objeto que está vazio', async () => {
      const result = await productsModel.getByName(name);
  
      expect(result).to.be.an('object');
      expect(result).to.be.empty;
    });
  });

  describe('quando o retorno do produto com nome der certo', () => {
    
    const productNameMock = [[
      {
        name: 'Martelo do Thor',
      }
    ]];
    const name = 'Martelo do Thor';
  
    beforeEach(() => {
      sinon.stub(connection, 'execute').resolves(productNameMock);
    });
  
    afterEach(() => {
      connection.execute.restore();
    });
  
    it('retorna um objeto com o atributo name', async () => {
      const result = await productsModel.getByName(name);
  
      expect(result).to.be.an('object');
      expect(result).to.be.includes.all.keys('name');
    });
  });
});

describe('Cria um novo produto no BD, createProduct-model', () => {
  describe('quando o produto é inserido com sucesso', () => {

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };

    beforeEach(() => {
      const execute = [{ insertId: 3 }]

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um objeto que possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.createProduct(newProductMock);

      expect(response).to.be.an('object');
      expect(response).to.have.a.property('id');
    });
  });
});

describe('Atualiza um produto no BD, updateProduct-model', () => {
  describe('quando a atualização do produto dá certo', () => {

    const updateProductMock = {
      id: 1,
      name: 'Headset',
      quantity: 5,
    };

    beforeEach(() => {
      const execute = [{
        name: 'Headset',
        quantity: 5,
        id: 1,
      }];

      sinon.stub(connection, 'execute').resolves(execute);
    });

    afterEach(() => {
      connection.execute.restore();
    });

    it('retorna um objeto que possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.updateProduct(updateProductMock);

      expect(response).to.be.an('object');
      expect(response).to.be.includes.all.keys('id', 'name', 'quantity');
    });
  });
});

describe('Deleta um produto do BD, deleteProduct-model', () => {
  describe('quando o produto é apagado com sucesso', () => {

    let connectionExecuteStub;
    const id = 1;

    beforeEach(() => {
      connectionExecuteStub = sinon.stub(connection, 'execute');
      // quando eu coloco um .resolves eu espero um retorno e, nesse caso,
      // eu não quero um retorno, quero testar só a execução dele.
    });

    afterEach(() => {
      connectionExecuteStub.restore();
    });

    it('não retorna nada', async () => {
      await productsModel.deleteProduct(id);

      expect(connectionExecuteStub.calledOnce).to.be.true;
      expect(connectionExecuteStub.getCall(0).args)
        .to.deep.equal(['DELETE FROM StoreManager.products WHERE id = ?', [id]]);
    });
  });
});
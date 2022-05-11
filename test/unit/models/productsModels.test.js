const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../models/productsModel');
const connection = require('../../../models/connection');

describe('Busca todos os produtos no BD, getAll-products-model', () => {
  describe('quando não existe nenhum produto criado', () => {

    const resultExecute = [[]];

    before(() => {
      sinon.stub(connection, 'execute')
        .resolves(resultExecute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await productsModel.getAll();

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
      sinon.stub(connection, 'execute')
        .resolves([resultExecute]);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.an('array');
    });

    it('o array não está vazio', async () => {
      const result = await productsModel.getAll();

      expect(result).to.be.not.empty;
    });

    it('o array possui objetos', async () => {
      const [result] = await productsModel.getAll();

      expect(result).to.be.an('object');
    });

    it('o objeto que está no array contêm os atributos id, name, quantity', async () => {
      const [result] = await productsModel.getAll();

      expect(result).to.be.includes.all.keys(
        'id',
        'name',
        'quantity'
      );
    });
  });
});

describe('Busca os produtos por id no BD, getById-products-model', () => {

  const productIdMock = [[
    {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    }
  ]]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productIdMock);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um objeto', async () => {
    const result = await productsModel.getById();

    expect(result).to.be.an('object');
  });

  it('o objeto contêm os atributos id, name, quantity', async () => {
    const result = await productsModel.getById();

    expect(result).to.be.includes.all.keys(
      'id',
      'name',
      'quantity'
    );
  });
});

describe('Busca todos os nomes dos produtos no BD, getByName-products-model', () => {
  const productIdMock = [[
    {
      name: 'Martelo do Thor',
    }
  ]]

  before(() => {
    sinon.stub(connection, 'execute').resolves(productIdMock);
  });

  after(() => {
    connection.execute.restore();
  });

  it('retorna um objeto', async () => {
    const result = await productsModel.getByName();

    expect(result).to.be.an('object');
  });

  it('o objeto contêm o atributo name', async () => {
    const result = await productsModel.getByName();

    expect(result).to.be.includes.all.keys('name');
  });
});

describe('Cria um novo produto no BD, createProduct-model', () => {
  describe('Quando é inserido com sucesso', () => {

    const newProductMock = {
      name: 'Headset',
      quantity: 5,
    };

    before(() => {
      const execute = [{ insertId: 3 }]

      sinon.stub(connection, 'execute').resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    })

    it('retorna um objeto', async () => {
      const response = await productsModel.createProduct(newProductMock);

      expect(response).to.be.an('object');
    });

    it('o objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsModel.createProduct(newProductMock);

      expect(response).to.have.a.property('id');
    });
  });
});
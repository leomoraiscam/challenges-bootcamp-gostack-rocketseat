- costumers
  - id
  - name
  - email
  - created_at
  - updated_at

- products
  - id
  - name
  - price
  - quantity
  - created_at
  - updated_at

- orders
  - id
  - costumer_id
  - created_at
  - updated_at

- orders_products
  - id
  - product_id
  - order_id
  - price
  - quantity
  - created_at
  - updated_at



  ###

  ManyToOne [OrdersCustumer]
  N:1


1)
  uma ordem pertence ao um consumidor, como pode não pertencer a nenhum consumidor
  [ordem para consumidor]
2)
  varios produtos podem estar em varias ordens
  [produto para ordem]

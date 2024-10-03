const AddressCart = ({ address }) => {
  return (
    <div>
      <p>
        {address?.firstName} {address?.lastName}
      </p>
      <p>{address?.streetAddress}</p>
      <p>{address?.city} </p>
      <p>{address?.state} </p>
      <p>{address?.pinCode}</p>
      <p>{address?.phone}</p>
    </div>
  );
};

export default AddressCart;

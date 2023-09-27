import React from 'react';
import ReactDOM from 'react-dom/client'
import { getTransactionID } from './constants'; 

function TransactionID() {
  const transactionID = getTransactionID(); // Retrieve the transactionID

  return (
    <section>
      <div className="col-lg-12">
        <center>
          <h2>Transaction ID:</h2>
          <h5>{transactionID}</h5>
        </center>
      </div>
      <div>
        <center>
          <img src="img/myticket.png" alt="" width="800px" />
        </center>
      </div>
    </section>
  );
}

export default TransactionID;

ReactDOM.createRoot(document.getElementById('transactionID')!).render(
    <React.StrictMode>
      <TransactionID />
    </React.StrictMode>,
)

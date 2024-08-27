import { useState, useEffect } from "react";
import "../styles/modal.css";
import ProductionService from "../service/ProductionService"

const ProduceModal = ({ item, isVisible, onClose }) => {
    const [quantity, setQuantity] = useState("");
    const [status, setStatus] = useState("false");
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDate(today);
    }, []);

    useEffect(() => {
        console.log(status);
    }, [status]);

    const handleSave = async (e) => {
        e.preventDefault();
        // Handle the save action here
        try {
            const response = await ProductionService.CreateProduction({"productId": item, "quantity": quantity, "status": status?"true":"false", "date": date});
            console.log(response.data);
            alert(response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modalProduct">
                <form onSubmit={handleSave}>
                    <h2 style={{ color: "blue" }} className="text-align-center mb-3">
                        Produce the selected product
                    </h2>
                    <div className="form-group">
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            required
                            type="number"
                            id="quantity"
                            className="form-control"
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="Enter quantity.."
                        />
                        <small style={{ color: "blue" }} className="form-text text-muted">
                            Specify the Quantity you want to produce
                        </small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            required
                            type="date"
                            id="date"
                            className="form-control"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <small className="form-text text-muted">
                            Select production date
                        </small>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="processing"
                            name="status"
                            value="false"
                            checked={status === "false"}
                            onChange={() => setStatus("false")}
                        />
                        <label className="form-check-label" htmlFor="processing">
                            Processing
                        </label>
                    </div>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="radio"
                            id="finished"
                            name="status"
                            value="true"
                            checked={status === "true"}
                            onChange={() => setStatus("true")}
                        />
                        <label className="form-check-label" htmlFor="finished">
                            Finished
                        </label>
                    </div>
                    <div className="d-flex">
                        <button type="button" className="btn btn-secondary m-3" onClick={onClose}>Close</button>
                        <button type="submit" className="btn btn-primary m-3">Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProduceModal;

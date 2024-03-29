import { useState } from "react";
import axios from "axios";
import  "./styles.css"
import ScaleLoader from "react-spinners/ScaleLoader";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const url = `http://localhost:4000/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
			setLoading(false);
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
				setLoading(false);
			}
		}
	};

	return (
		<div className={"forgotContainer"}>
          {!loading?
			<form className={"form_forgotContainer"} onSubmit={handleSubmit}>
				<h1>Forgot Password</h1>
				<input
					type="email"
					placeholder="Email"
					name="email"
					onChange={(e) => setEmail(e.target.value)}
					value={email}
					required
					className={"input"}
				/>
				{error && <div className={"error_msg"}>{error}</div>}
				{msg && <div className={"success_msg"}>{msg}</div>}
				<button disabled={loading} type="submit" className={"green_btn"}>
					Submit
				</button>
			</form>:  <ScaleLoader color="#3d49fc" size="150"  />}
		</div>
	);
};

export default ForgotPassword;

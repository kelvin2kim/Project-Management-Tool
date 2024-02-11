import Authform from "../../../components/Authform"

const delay = (time) => new Promise((resolve) => {
    setTimeout(() => resolve(1), time)
})


export default async function Register() {
	await delay(100)
	return <div>
		<Authform mode = "register"/>
	</div>
}
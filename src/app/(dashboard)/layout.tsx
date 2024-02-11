import Head from "next/head"
import "../../styles/global.css"
import GlassPane from "../../components/GlassPane"
import Sidebar from "../../components/Sidebar";


export default function DashboardRtLayour({children}) {
	return (
		<html lang="en">
			<Head />
			<body className="h-screen w-screen blue-gradient p-6">
				<GlassPane className="w-full h-full flex items-center">
					<Sidebar/>
					{children}
				</GlassPane>
				<div id="modal"></div>
			</body>
		</html>
		);
}
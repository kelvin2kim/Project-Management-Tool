import Head from "next/head"
import "../../styles/global.css"
import GlassPane from "../../components/GlassPane"


export default function AuthRootLayout({children}) {
	return (
		<html lang="en">
			<Head />
			<body className="h-screen w-screen blue-gradient p-6">
				<GlassPane className="w-full h-full flex items-center justify-center">
					{children}
				</GlassPane>
			</body>
		</html>
		);
}
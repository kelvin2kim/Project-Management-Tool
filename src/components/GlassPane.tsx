import clsx from "clsx"

/*
We pass in className as an input for this component since we want to be able to adjust the className 
of the <div> dynamically based on what classname is. For example if we also wanted to add an
additional property to <div> like font-style or something, we can simply do so by passing that in as
input when using the component. This is what clsx allows us to do
*/
export default function GlassPane ({children, className}) {
	return <div className={clsx('glass rounded-2xl border-solid border-3 border-gray-200', className)}>
		{children}
	</div>
}

import login from "@/api/auth.api"
import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { ArrowLeft, Eye, EyeOff, Loader2, Lock, User } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
	const [form, setForm] = useState({
		username: "",
		password: "",
	})
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false)
	const navigate = useNavigate()

	const handleSubmit = async (e) => {
		e.preventDefault()
		setLoading(true)

		try {
			const response = await login(form)
			toast.success("Login successful 🎉")

			// Token saqlash
			localStorage.setItem("token", response.data.token)

			// Bosh sahifaga o‘tish va reload
			navigate("/")
			window.location.reload() // shu satr sahifani yangilaydi va sidebar yangilanadi
		} catch (error) {
			toast.error(error.response?.data?.message || "Login failed ❌")
		} finally {
			setLoading(false)
		}
	}

	const itemVariants = {
		hidden: { opacity: 0, x: -20 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { duration: 0.4, ease: "easeOut" },
		},
	}

	const inputVariants = {
		focus: {
			scale: 1.02,
			transition: { duration: 0.2 },
		},
	}
	return (
		<div className='min-h-screen flex items-center justify-center px-4 bg-slate-900/95 backdrop-blur-sm'>
			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className='w-full max-w-md shadow-xl'
			>
				<Card className='w-full max-w-md shadow-xl py-12 backdrop-blur-lg bg-white/10'>
					<CardHeader className='text-center space-y-2'>
						<CardTitle className='text-3xl font-bold flex justify-center items-center gap-2'>
							Welcome back
							<motion.span
								animate={{
									rotate: [0, 15, -10, 15, 0],
									x: [0, 4, -4, 4, 0],
								}}
								transition={{
									duration: 2,
									repeat: Infinity,
									ease: "easeInOut",
								}}
							>
								👋
							</motion.span>
						</CardTitle>

						<CardDescription>Login to your account to continue</CardDescription>
					</CardHeader>

					<CardContent>
						<form onSubmit={handleSubmit} className='space-y-5'>
							{/* Username */}
							<motion.div
								className='space-y-2'
								variants={itemVariants}
								initial='hidden'
								animate='visible'
								transition={{ delay: 0.15 }}
							>
								<Label
									htmlFor='username'
									className='text-slate-200 font-medium'
								>
									Username
								</Label>
								<motion.div
									className='relative group'
									variants={inputVariants}
									whileFocus='focus'
								>
									<User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 transition-colors ' />
									<Input
										id='username'
										placeholder='johnd'
										className='pl-10 bg-slate-700/50 border border-slate-600  text-white placeholder:text-slate-400 transition-all duration-300 h-11'
										value={form.username}
										onChange={(e) =>
											setForm({ ...form, username: e.target.value })
										}
										required
									/>
									<motion.div className='absolute inset-0 rounded-md bg-linear-to-r from-blue-500 to-blue-900 -z-10 opacity-0 blur group-focus-within:opacity-20 transition-opacity' />
								</motion.div>
							</motion.div>

							{/* Password */}
							<motion.div
								className='space-y-2'
								variants={itemVariants}
								initial='hidden'
								animate='visible'
								transition={{ delay: 0.2 }}
							>
								<Label
									htmlFor='password'
									className='text-slate-200 font-medium'
								>
									Password
								</Label>
								<motion.div
									className='relative group'
									variants={inputVariants}
									whileFocus='focus'
								>
									<Lock className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-400 transition-colors ' />
									<Input
										id='password'
										type={showPassword ? "text" : "password"}
										placeholder='••••••••'
										className='pl-10 pr-10 bg-slate-700/50 border border-slate-600  text-white placeholder:text-slate-400 transition-all duration-300 h-11'
										value={form.password}
										onChange={(e) =>
											setForm({ ...form, password: e.target.value })
										}
										required
									/>
									<button
										type='button'
										onClick={() => setShowPassword(!showPassword)}
										className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors'
									>
										{showPassword ? (
											<EyeOff className='h-5 w-5' />
										) : (
											<Eye className='h-5 w-5' />
										)}
									</button>
									<motion.div className='absolute inset-0 rounded-md bg-linear-to-r from-blue-500 to-blue-900 -z-10 opacity-0 blur group-focus-within:opacity-20 transition-opacity' />
								</motion.div>
							</motion.div>

							{/* Button */}
							<Button
								type='submit'
								className='w-full transition-transform hover:scale-[1.02]'
								disabled={loading}
								onClick={handleSubmit}
							>
								{loading ? (
									<>
										<Loader2 className='mr-2 h-4 w-4 animate-spin' />
										Signing in...
									</>
								) : (
									"Sign in"
								)}
							</Button>
						</form>
						<motion.div
							className='mt-8 p-4 bg-slate-700/30 border border-slate-600/50 rounded-lg space-y-3'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							transition={{ delay: 0.3 }}
						>
							<p className='text-xs font-semibold text-slate-300 uppercase tracking-wide'>
								Demo Credentials
							</p>
							<div className='space-y-2'>
								<div className='flex justify-between items-center text-sm'>
									<span className='text-slate-400'>Username:</span>
									<code className='bg-slate-600/50 px-3 py-1 rounded text-blue-300 font-mono'>
										johnd
									</code>
								</div>
								<div className='flex justify-between items-center text-sm'>
									<span className='text-slate-400'>Password:</span>
									<code className='bg-slate-600/50 px-3 py-1 rounded text-blue-300 font-mono'>
										m38rmF$
									</code>
								</div>
							</div>
						</motion.div>
						<motion.div
							className='mt-8 flex justify-center'
							variants={itemVariants}
							initial='hidden'
							animate='visible'
							transition={{ delay: 0.3 }}
						>
							<Button
								type='button'
								variant='outline'
								onClick={() => navigate("/")}
							>
								<ArrowLeft className='ml-2 h-4 w-4' />
								Back to Home
							</Button>
						</motion.div>
					</CardContent>
				</Card>
			</motion.div>
		</div>
	)
}

export default Login

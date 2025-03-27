import { motion } from "framer-motion";

export default function Skeleton() {
    return (
        <div className="w-full rounded-md">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-11 gap-4 grid-flow-row">
                {[...Array(22)].map((_, index) => (
                    <div key={index} className="aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
                        {/* Horizontal highlight effect */}
                        <motion.div
                            className="absolute inset-y-0 w-[50%] bg-gradient-to-r from-transparent via-white/70 to-transparent"
                            initial={{
                                left: "-50%",
                                opacity: 0.8,
                            }}
                            animate={{
                                left: "100%",
                                opacity: 0.8,
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 0.5,
                                ease: "easeInOut",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}


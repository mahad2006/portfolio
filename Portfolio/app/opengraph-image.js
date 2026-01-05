import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Shaikh Mahad | Backend Systems Engineer'
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#050505',
                    fontFamily: 'monospace',
                    position: 'relative',
                }}
            >
                {/* Background Grid Pattern */}
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.2,
                    }}
                />

                {/* Glowing Orbs */}
                <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', background: '#6DB33F', filter: 'blur(150px)', opacity: 0.15 }}></div>
                <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '600px', height: '600px', background: '#E76F00', filter: 'blur(150px)', opacity: 0.15 }}></div>

                {/* Main Content Container */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '60px 80px',
                        backgroundColor: 'rgba(20,20,20,0.8)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                    }}
                >
                    <img
                        src={`${process.env.NEXT_PUBLIC_BASE_URL}/og-profile.png`}
                        alt="Shaikh Mahad"
                        width={200}
                        height={200}
                        style={{
                            borderRadius: '50%',
                            border: '4px solid #6DB33F',
                            marginRight: '50px',
                        }}
                    />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                    >
                        {/* Status Badge */}
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '10px 24px',
                                borderRadius: '50px',
                                border: '1px solid rgba(109, 179, 63, 0.3)',
                                backgroundColor: 'rgba(109, 179, 63, 0.1)',
                                color: '#6DB33F',
                                fontSize: 20,
                                fontWeight: 600,
                                marginBottom: 30,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                            }}
                        >
                            <div style={{ width: 12, height: 12, borderRadius: '50%', backgroundColor: '#6DB33F' }}></div>
                            Available for Hire
                        </div>

                        {/* Name */}
                        <div style={{ fontSize: 84, fontWeight: 900, color: 'white', letterSpacing: '-2px', marginBottom: 10, display: 'flex' }}>
                            Shaikh Mahad<span style={{ color: '#6DB33F' }}>.</span>
                        </div>

                        {/* Role */}
                        <div style={{ fontSize: 32, color: '#999', marginBottom: 40 }}>
                            Backend Systems Engineer
                        </div>

                        {/* Tech Stack Row */}
                        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                            {['Java', 'Spring Boot', 'PostgreSQL', 'Distributed Systems'].map((tech, i) => (
                                <div key={i} style={{ padding: '12px 24px', backgroundColor: '#1a1a1a', color: '#ccc', borderRadius: '12px', fontSize: 20, border: '1px solid #333' }}>
                                    {tech}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
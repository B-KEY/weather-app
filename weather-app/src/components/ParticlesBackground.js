import React from 'react';
import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticlesBackground = ({ weatherCondition }) => {
    const particlesInit = useCallback(async engine => {
        await loadSlim(engine);
    }, []);

    const baseConfig = {
        background: {
            opacity: 0
        },
        fpsLimit: 60,
        interactivity: {
            detectsOn: "canvas",
            events: {
                onClick: {
                    enable: true,
                    mode: "push"
                },
                onHover: {
                    enable: true,
                    mode: "grab",
                    parallax: {
                        enable: true,
                        force: 60,
                        smooth: 10
                    }
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 200,
                    links: {
                        opacity: 0.2
                    }
                }
            }
        },
        particles: {
            color: {
                value: ["#004e92", "#0070c0", "#00a6e0", "#ffffff"]
            },
            links: {
                color: "#004e92",
                distance: 150,
                enable: true,
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: "none",
                random: true,
                straight: false,
                outModes: {
                    default: "bounce"
                },
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            },
            number: {
                value: 60,
                density: {
                    enable: true,
                    value_area: 900
                }
            },
            opacity: {
                value: 0.6,
                random: true,
                animation: {
                    enable: true,
                    speed: 0.3,
                    minimumValue: 0.1,
                    sync: false
                }
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 3,
                random: true,
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.5,
                    sync: false
                }
            },
            twinkle: {
                particles: {
                    enable: true,
                    frequency: 0.05,
                    opacity: 1
                }
            }
        }
    };

    const getParticleConfig = () => {
        switch(weatherCondition?.toLowerCase()) {
            case 'rain':
            case 'drizzle':
                return {
                    ...baseConfig,
                    particles: {
                        number: {
                            value: 100,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape: {
                            type: "line"
                        },
                        size: {
                            value: 3,
                            random: true
                        },
                        move: {
                            enable: true,
                            speed: 15,
                            direction: "bottom",
                            straight: true
                        },
                        opacity: {
                            value: 0.5,
                            random: true
                        }
                    }
                };
            case 'snow':
                return {
                    ...baseConfig,
                    particles: {
                        number: {
                            value: 50,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape: {
                            type: "circle"
                        },
                        opacity: {
                            value: 0.7,
                            random: true
                        },
                        size: {
                            value: 4,
                            random: true
                        },
                        move: {
                            enable: true,
                            speed: 2,
                            direction: "bottom",
                            random: true,
                            straight: false,
                            outModes: {
                                bottom: "out"
                            },
                            attract: {
                                enable: true,
                                rotateX: 300,
                                rotateY: 1200
                            }
                        }
                    }
                };
            case 'clouds':
            case 'mist':
            case 'haze':
                return {
                    ...baseConfig,
                    particles: {
                        number: {
                            value: 15,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#ffffff"
                        },
                        shape: {
                            type: "circle"
                        },
                        opacity: {
                            value: 0.3,
                            random: true
                        },
                        size: {
                            value: 50,
                            random: true
                        },
                        move: {
                            enable: true,
                            speed: 1,
                            direction: "right",
                            random: true,
                            straight: false,
                            outModes: {
                                default: "out"
                            }
                        }
                    }
                };
            case 'clear':
                return {
                    ...baseConfig,
                    particles: {
                        number: {
                            value: 30,
                            density: {
                                enable: true,
                                value_area: 800
                            }
                        },
                        color: {
                            value: "#FFD700"
                        },
                        shape: {
                            type: "star"
                        },
                        opacity: {
                            value: 0.5,
                            random: true,
                            animation: {
                                enable: true,
                                speed: 0.5,
                                minimumValue: 0.1,
                                sync: false
                            }
                        },
                        size: {
                            value: 4,
                            random: true,
                            animation: {
                                enable: true,
                                speed: 2,
                                minimumValue: 0.5,
                                sync: false
                            }
                        },
                        move: {
                            enable: true,
                            speed: 1.5,
                            direction: "none",
                            random: true,
                            straight: false,
                            outModes: {
                                default: "bounce"
                            }
                        }
                    }
                };
            default:
                return baseConfig;
        }
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={getParticleConfig()}
        />
    );
};

export default ParticlesBackground; 
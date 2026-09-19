import type { Skill } from "@/types";
import {
  AntDesignIcon,
  BootstrapIcon,
  DockerIcon,
  ExpressIcon,
  FigmaIcon,
  JavaScriptIcon,
  KubernetesIcon,
  LaravelIcon,
  MongoDbIcon,
  MySqlIcon,
  NestJsIcon,
  NextJsIcon,
  NodeJsIcon,
  PhpIcon,
  ReactIcon,
  RedisIcon,
  SassIcon,
  TailwindCssIcon,
  TypeScriptIcon,
} from "@/components/icons";

export const frontendSkills: readonly Skill[] = [
  { name: "React", Icon: ReactIcon },
  { name: "JavaScript", Icon: JavaScriptIcon },
  { name: "TypeScript", Icon: TypeScriptIcon },
  { name: "Next.js", Icon: NextJsIcon },
  { name: "Bootstrap", Icon: BootstrapIcon },
  { name: "Ant Design", Icon: AntDesignIcon },
  { name: "Figma", Icon: FigmaIcon },
  { name: "Sass", Icon: SassIcon },
  { name: "Tailwind CSS", Icon: TailwindCssIcon },
] as const;

export const backendSkills: readonly Skill[] = [
  { name: "Node.js", Icon: NodeJsIcon },
  { name: "Express", Icon: ExpressIcon },
  { name: "NestJS", Icon: NestJsIcon },
  { name: "PHP", Icon: PhpIcon },
  { name: "Laravel", Icon: LaravelIcon },
  { name: "Redis", Icon: RedisIcon },
  { name: "MySQL", Icon: MySqlIcon },
  { name: "MongoDB", Icon: MongoDbIcon },
  { name: "Docker", Icon: DockerIcon },
  { name: "Kubernetes", Icon: KubernetesIcon },
] as const;

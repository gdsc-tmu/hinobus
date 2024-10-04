import { unstable_ClassNameGenerator } from "@mui/material/className";
import hash from "fnv1a";

class ClassNameGenerator {
  static classNames: { [componentName: string]: string } = {};

  static get(componentName: string): string {
    return (this.classNames[componentName] ??=
      "gdsc-" + hash(componentName.slice(3)).toString(36));
  }
}

unstable_ClassNameGenerator.configure((componentName) =>
  ClassNameGenerator.get(componentName)
);

import { Enum } from "./Enum";

const FeatureAttributeType = {
  INT: Enum("INT", "integer"),
  FLOAT: Enum("FLOAT", "float"),
  DEC: Enum("DEC", "decimal"),
  STRING: Enum("STRING", "string"),
  TEXT: Enum("TEXT", "text"),
	BOOL: Enum("BOOL", "boolean"),
  DATE: Enum("DATE", "date"),
  TIME: Enum("TIME", "datetime")
}

export default FeatureAttributeType;
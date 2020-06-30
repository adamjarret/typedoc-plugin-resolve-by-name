import { DeclarationReflection } from 'typedoc';
import { Component, ConverterComponent } from 'typedoc/dist/lib/converter/components';
import { Context } from 'typedoc/dist/lib/converter/context';
import { Converter } from 'typedoc/dist/lib/converter/converter';
import { Reflection, Decorator } from 'typedoc/dist/lib/models/reflections';
import {
  Type,
  ReferenceType,
  TupleType,
  UnionType,
  IntersectionType,
  ArrayType,
  TypeOperatorType,
  QueryType
} from 'typedoc/dist/lib/models/types';

@Component({ name: 'resolve-by-name' })
export class ResolveByNamePlugin extends ConverterComponent {
  constructor(owner: Converter) {
    super(owner);

    this.listenTo(this.owner, {
      [Converter.EVENT_RESOLVE]: this.onResolve
    });
  }

  /**
   * Triggered when the converter resolves a reflection.
   * @param context  The context object describing the current state the converter is in.
   * @param reflection  The reflection that is currently resolved.
   * @remarks This code was extracted from the TypePlugin class in typedoc and has been modified.
   * @license Apache-2.0 Copyright 2016-2020 [TypeDoc Contributors](https://github.com/TypeStrong/typedoc/graphs/contributors)
   * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/converter/plugins/TypePlugin.ts
   */
  private onResolve(context: Context, reflection: DeclarationReflection) {
    resolveType(reflection, <ReferenceType>reflection.type);
    resolveType(reflection, <ReferenceType>reflection.inheritedFrom);
    resolveType(reflection, <ReferenceType>reflection.overwrites);
    resolveTypes(reflection, reflection.extendedTypes);
    resolveTypes(reflection, reflection.extendedBy);
    resolveTypes(reflection, reflection.implementedTypes);

    if (reflection.decorators) {
      reflection.decorators.forEach((decorator: Decorator) => {
        if (decorator.type) {
          resolveType(reflection, decorator.type);
        }
      });
    }

    function resolveTypes(reflection: Reflection, types?: Type[]) {
      if (!types) {
        return;
      }
      for (let i = 0, c = types.length; i < c; i++) {
        resolveType(reflection, <ReferenceType>types[i]);
      }
    }

    function resolveType(reflection: Reflection, type: Type) {
      if (type instanceof ReferenceType) {
        // If type reflection is undefined, attempt to find it by name
        if (!type.reflection) {
          type.reflection = reflection.findReflectionByName(type.name);
        }
        if (type.typeArguments) {
          resolveTypes(reflection, type.typeArguments);
        }
      } else if (type instanceof TupleType) {
        resolveTypes(reflection, type.elements);
      } else if (type instanceof UnionType || type instanceof IntersectionType) {
        resolveTypes(reflection, type.types);
      } else if (type instanceof ArrayType) {
        resolveType(reflection, type.elementType);
      } else if (type instanceof TypeOperatorType) {
        resolveType(reflection, type.target);
      } else if (type instanceof QueryType) {
        resolveType(reflection, type.queryType);
      }
    }
  }
}

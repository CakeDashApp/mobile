import React, { FC, useCallback, useEffect } from "react";
import styled from "styled-components/native";
import CTabButton from "./cTabButton";
import CSearchInput from "./cSearchInput";
import { View } from "react-native";

export interface TagInterface {
  key: string | number;
  label: string;
}

interface Props {
  // Tag
  tags: TagInterface[];
  startTagKey?: string | number;
  onTagChanged: (tag: TagInterface) => void;

  // Search
  searchTag?:
    | {
        onSearch?: () => void;
        isDummy?: boolean;
        initialFocused?: boolean;
      }
    | boolean;
  onSearchValueChanged?: (value: string | null) => void;
  onSearch?: (search: boolean) => void;
}

const CTabRow: FC<Props> = (props) => {
  // Props
  const { tags, startTagKey, onTagChanged, searchTag, onSearch } = props;
  const onSearchValueChanged = props.onSearchValueChanged || (() => {});

  // Tag
  const [currentTagKey, setCurrentTagKey] = React.useState<string | number>(
    startTagKey || tags[0].key
  );

  // Search
  const [searchValue, setSearchValue] = React.useState<string | null>(null);
  const [searchTagIsOpen, setSearchTagIsOpen] = React.useState<boolean>(
    searchTag?.initialFocused || false
  );

  //======================================================================================================================
  // On Search Tag Changes
  //======================================================================================================================

  useEffect(() => {
    if (onSearch) onSearch(searchTagIsOpen);
  }, [searchTagIsOpen]);

  //======================================================================================================================
  // On Tag Changed
  //======================================================================================================================

  const _onTagChanged = useCallback(
    (tag: TagInterface) => {
      if (currentTagKey !== tag.key) {
        onTagChanged(tag);
        setCurrentTagKey(tag.key);
      }
    },
    [currentTagKey, onTagChanged]
  );

  //======================================================================================================================
  // On Search Value Changed
  //======================================================================================================================

  const _onSearchValueChanged = useCallback(
    (value: string) => {
      if (value !== searchValue) {
        const newValue: string | null = value !== "" ? value : null;
        onSearchValueChanged(newValue);
        setSearchValue(newValue);
      }
    },
    [onSearchValueChanged, searchValue]
  );

  //======================================================================================================================
  // Render
  //======================================================================================================================

  return (
    <Container>
      <TagsContainer searchTagIsOpen={searchTagIsOpen}>
        {tags.map((tag) => {
          return (
            <View key={tag.key}>
              <CTabButton
                selected={currentTagKey === tag.key}
                onPress={() => _onTagChanged(tag)}
                label={tag.label}
              />
            </View>
          );
        })}
      </TagsContainer>
      {searchTag && (
        <SearchInputContainer>
          <SearchInput
            onValueUpdate={_onSearchValueChanged}
            defaultOpen={searchTagIsOpen}
            onOpen={() => {
              if (!searchTag?.isDummy) setSearchTagIsOpen(true);

              if (typeof searchTag === "object" && "onSearch" in searchTag)
                searchTag?.onSearch();
            }}
            onClose={() => setSearchTagIsOpen(false)}
            isDummy={searchTag?.isDummy}
            clearable
            searchTagIsOpen={searchTagIsOpen}
          />
        </SearchInputContainer>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  height: 50px;
  justify-content: space-between;
`;

const TagsContainer = styled.View<{ searchTagIsOpen: boolean }>`
  flex-direction: row;
  z-index: ${(props) => (props.searchTagIsOpen ? -1 : 1)};
`;

const SearchInput = styled(CSearchInput)<{ searchTagIsOpen: boolean }>`
  position: absolute;
  height: 100%;
  align-items: center;
  width: ${(props) => (props.searchTagIsOpen ? 100 : 15)}%;
`;

const SearchInputContainer = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-end;
`;

export default CTabRow;

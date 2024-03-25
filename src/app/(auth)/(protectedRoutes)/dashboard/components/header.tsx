"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import FileDataContext from "@/context/fileData/fileDataContext";
import { Value } from "@radix-ui/react-select";
import { MoveDown, MoveUp } from "lucide-react";
import { useContext } from "react";

const DashboardHeader = () => {
  const { sortBy, setSortBy, ascending, setAscending } =
    useContext(FileDataContext);
  return (
    <div>
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="my-2 flex gap-2">
        <Select value={sortBy} defaultValue={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-max">
            <Value>{`Sort by: ${sortBy}`}</Value>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort by</SelectLabel>
              <SelectItem value="Date">Date</SelectItem>
              <SelectItem value="Name">Name</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant={"outline"}
          className="justify-center items-center flex capitalize gap-0.5"
          onClick={() => setAscending(!ascending)}
        >
          {ascending ? "Asc" : "Desc"}
          {ascending ? <MoveUp size={12} /> : <MoveDown size={12} />}
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
